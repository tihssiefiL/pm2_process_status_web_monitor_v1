const { exec } = require('child-process-promise');
const fomatList = (list) => {
  let temp = list.split('┤')[1].split('└')[0].replace(/\n/g, '').split('│')
  temp.shift()
  let services = []
  let tempArr = []
  temp.map(data => {
    data.trim()
    if (data === '') {
      let port = null
      let tempObj = {
        name: tempArr[0], id: tempArr[1], version: tempArr[2], mode: tempArr[3], pid: tempArr[4], status: tempArr[5], restart: tempArr[6], uptime: tempArr[7], cpu: tempArr[8], mem: tempArr[9], user: tempArr[10], watching: tempArr[11], port,
      }
      tempArr = []
      services.push(tempObj)
      // console.log(tempArr)
    }
    else {
      tempArr.push(data)
    }
  })
  ports = []
  return services
}
const getList = () => {
  return exec(`pm2 list|grep -v 'pm2 show'`).then(async result => {
    let list = fomatList(result.stdout)
    let promiseArr = list.map(async data => {
      const pid = data.pid
      return getPort(pid).then(port => {
        data.port = port
        return data
      })
    })
    return Promise.all(promiseArr).then(res => {
      return res 
    })
  }).catch(err => {
    throw {
      name: err.name,
      code: err.code,
      error: err.stderr
    }
  })
}
const getPort = (pid) => {
  return exec(`netstat -nap | grep ${pid} | grep :::`).then(result => {
    console.log(result)
    let port = result.stdout.split(':::')[1]
    return port
  }).catch(err => {
    throw {
      name: err.name,
      code: err.code,
      error: err.stderr
    }
  })
}
// ┌──────────┬────┬─────────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
// │ App name │ id │ version │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user │ watching │
// ├──────────┼────┼─────────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
// │ server1  │ 0  │ N / A   │ fork │ 11235 │ online │ 3418    │ 0s     │ 0 %  │ 24.7 MB  │ root │ disabled │
// │ server2  │ 1  │ N / A   │ fork │ 11205 │ online │ 3405    │ 1s     │ 0 %  │ 25.8 MB  │ root │ disabled │
// └──────────┴────┴─────────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘

// getPort(14160).then(port => {
//   console.log(port)
// })
module.exports = getList