# pm2_process_status_web_monitor_api
#### i need to monit my services, but 'pm2 list' is not a simple&easy way to do it,so i need a api to help me monit my services in time.
## How To Use? See File Named server.js
## TODO:
## add api to start/stop/restart tasks
## 。。。
## pm2 list|grep -v 'pm2 show':
```javascript
┌──────────┬────┬─────────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
│ App name │ id │ version │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user │ watching │
├──────────┼────┼─────────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
│ server1  │ 0  │ N / A   │ fork │ 11235 │ online │ 3418    │ 0s     │ 0 %  │ 24.7 MB  │ root │ disabled │
│ server2  │ 1  │ N / A   │ fork │ 11205 │ online │ 3405    │ 1s     │ 0 %  │ 25.8 MB  │ root │ disabled │
└──────────┴────┴─────────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘
```
## JSON result:
```javascript
[
    {
        "name": " server1  ",
        "id": " 0  ",
        "version": " N/A     ",
        "mode": " fork ",
        "pid": " 10714 ",
        "status": " online ",
        "restart": " 11695   ",
        "uptime": " 21s    ",
        "cpu": " 0.2% ",
        "mem": " 45.2 MB   ",
        "user": " root ",
        "watching": " disabled ",
        "port": "8080                 "
    },
    {
        "name": " server2  ",
        "id": " 1  ",
        "version": " N/A     ",
        "mode": " fork ",
        "pid": " 10715 ",
        "status": " online ",
        "restart": " 11628   ",
        "uptime": " 21s    ",
        "cpu": " 0.1% ",
        "mem": " 42.4 MB   ",
        "user": " root ",
        "watching": " disabled ",
        "port": "8070                 "
    },
    {
        "name": " server3  ",
        "id": " 2  ",
        "version": " N/A     ",
        "mode": " fork ",
        "pid": " 10716 ",
        "status": " online ",
        "restart": " 18      ",
        "uptime": " 21s    ",
        "cpu": " 0.1% ",
        "mem": " 38.9 MB   ",
        "user": " root ",
        "watching": " disabled ",
        "port": "8090                 "
    }
]
```
