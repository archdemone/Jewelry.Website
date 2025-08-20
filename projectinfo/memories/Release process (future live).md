7\) Release process (future live)



Merge to main (PR green).



CI build → push image or deploy preview.



Smoke live: /, /api/healthz → 200.



Perf check (Lighthouse CI or Web Vitals).



Promote to production environment.



Rollback plan: redeploy previous artifact (tagged release) in one command.

