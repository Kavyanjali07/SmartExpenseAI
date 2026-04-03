package com.kavyanjali.smartexpense.config;

import com.kavyanjali.smartexpense.service.CustomUserDetailsService;
import com.kavyanjali.smartexpense.service.UserSessionService;
import com.kavyanjali.smartexpense.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserSessionService userSessionService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil,
                                   CustomUserDetailsService userDetailsService,
                                   UserSessionService userSessionService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userSessionService = userSessionService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // ✅ 1. No token → skip completely
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            // ✅ 2. Validate token
            if (!jwtUtil.validateToken(token)) {
                filterChain.doFilter(request, response);
                return;
            }

            if (!userSessionService.isSessionActive(token)) {
                filterChain.doFilter(request, response);
                return;
            }

            // ✅ 3. Extract username
            String username = jwtUtil.extractUsername(token);

            // ✅ 4. Set authentication ONLY if not already set
            if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
                userSessionService.touchSession(token);

                logger.debug("JWT authentication successful for user: {}", username);
            }

        } catch (Exception e) {
            // ✅ 5. NEVER break request flow
            logger.error("JWT processing failed: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
