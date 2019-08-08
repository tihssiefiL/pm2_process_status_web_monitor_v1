const { exec } = require('child-process-promise');
const formatList = (list) => {
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
    let list = formatList(result.stdout)
    let promiseArr = []
    list.map(data => {
      const pid = new Number(data.pid)
      if (pid != 0) {
        promiseArr.push(getPort(pid).then(port => {
          data.port = port
          return data
        }))
      }
      else return
    })
    return Promise.all(promiseArr).then(res => {
      console.log(res)
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
  pid = pid.toString()
  console.log(pid)
  return exec(`netstat -nap | grep ${pid} | grep LISTEN`).then(result => {
    result = result.stdout
    const reg = /:\d/
    const port = reg.exec(result)[0].split(':')[1]
    return port
  }).catch(err => {
    throw {
      name: err.name,
      code: err.code,
      error: err.stderr
    }
  })
}
module.exports = getList