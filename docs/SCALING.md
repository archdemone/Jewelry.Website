## Scaling Strategy

### Current Setup (0-1000 orders/month)
- Single server
- PostgreSQL database
- Local image storage

### Phase 2 (1000-5000 orders/month)
- Load balancer
- 2-3 app servers
- Database replication
- CDN for static assets
- Redis caching

### Phase 3 (5000+ orders/month)
- Kubernetes cluster
- Database clustering
- Elasticsearch for search
- Queue system (Bull/RabbitMQ)
- Microservices architecture