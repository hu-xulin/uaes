# Uter Deployment Map

**Knowledge status:** NOT_VERIFIED.  
**Last checked:** 2026-11-05.

The repository contains deployment assets such as `deploy/`, Dockerfiles, and Docker Compose files. Their presence does not prove the current production topology or deployment procedure.

## Required inventory

- Environments and regions.
- Compute, network, storage, and managed services.
- Container images and artifact provenance.
- Runtime configuration and secret references (never secret values).
- Database/cache endpoints and network boundaries.
- Deployment authorization and promotion process.
- Health checks, rollback, and disaster recovery.

Populate from approved infrastructure-as-code and operational runbooks. Do not guess hostnames, IP addresses, credentials, or production topology.
