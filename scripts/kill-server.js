const { execSync, spawn } = require('child_process');
const os = require('os');

const PORT = process.env.PORT || 3010;

function killProcessOnPort() {
  try {
    if (os.platform() === 'win32') {
      try {
        const command = `FOR /F "tokens=5" %a in ('netstat -ano ^| find ":${PORT}" ^| find "LISTENING"') do taskkill /F /PID %a`;
        execSync(command, { shell: 'cmd.exe', stdio: 'ignore' });
      } catch (error) {
      }
    } else {
      try {
        const pids = execSync(`lsof -t -i:${PORT}`).toString().trim().split('\n');
        
        if (pids && pids.length && pids[0] !== '') {
          pids.forEach(pid => {
            try {
              process.kill(parseInt(pid), 'SIGKILL');
              console.log(`Процесс ${pid} на порту ${PORT} завершен`);
            } catch (e) {
            }
          });
        }
      } catch (error) {
      }
    }
    
    return new Promise(resolve => setTimeout(resolve, 300));
  } catch (error) {
    console.error('Ошибка при освобождении порта:', error);
    return Promise.resolve();
  }
}

killProcessOnPort().then(() => {
  console.log(`Порт ${PORT} освобожден (или был свободен)`);
}); 