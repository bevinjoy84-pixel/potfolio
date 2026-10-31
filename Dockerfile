# ==============================================================================
# Production Dockerfile for BEVIN JOY G Portfolio
# B.Tech Pharmaceutical Technology & AI Researcher
# Ultra-lightweight, hardened Nginx Alpine image with HTTP/2 & Gzip compression
# ==============================================================================

FROM nginx:1.27-alpine-slim

LABEL maintainer="Bevin Joy G <bevinjoy1019@gmail.com>" \
      description="Personal Portfolio Website of Bevin Joy G - B.Tech Pharmaceutical Technology & AI" \
      version="6.0.0"

# Remove default nginx boilerplate website and configuration
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy production Nginx server configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy portfolio static assets
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/
COPY vercel.json netlify.toml /usr/share/nginx/html/

# Secure file permissions (readable by nginx worker process)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Container healthcheck ensuring web server is responding to HTTP probes
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/ || exit 1

# Expose standard HTTP port
EXPOSE 80

# Run nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]

