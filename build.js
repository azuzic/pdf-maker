import { exec } from 'child_process';

async function runCommands() {
    try {
        console.log('|===================================================================================================|');
        console.log(' 1. Generateing taiwind css');
        await executeCommand('npx tailwindcss -i ./src/style.css -o ./src/css/tailwind.css');
        console.log(' ✅ Taiwind CSS created successfully! ✅\n');

        console.log(' 2. Appending CSS for print styles to tailwind.css');
        await executeCommand('echo @media print{@page{margin:0;}}@media screen{body{margin:0;}} >> ./src/css/tailwind.css');
        console.log(' ✅ CSS appended successfully! ✅\n');

        console.log(' 3. Starting development server with: npm run dev');
        const serverProcess = exec('npm run dev');
        serverProcess.stdout.on('data', (data) => {
            const match = data.match(/Local:(.*)$/);
            if (match) {
                const serverAddress = match[1].trim();
                console.log(`Development server started at: ${serverAddress}`);
            }
            console.log(data);
        });
        serverProcess.stderr.on('data', (data) => {
            console.error(data);
        });

        console.log(' ✅ All commands executed successfully! ✅');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error) => {
            if (error) {
                console.error('Command execution error:', error.message);
                reject(error);
                return;
            }
            resolve();
        });
    });
}

runCommands();
