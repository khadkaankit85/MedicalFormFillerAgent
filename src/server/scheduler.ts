import cron from 'node-cron';
import { runWorkflow } from './workflow';

const task = cron.schedule('*/5 * * * *', async () => {
  console.log(`[${new Date().toISOString()}] Running scheduled workflow...`);

  try {
    await runWorkflow();
    console.log(`[${new Date().toISOString()}] Workflow completed`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Workflow failed:`, error);
  }
});

console.log('Scheduler started - runs every 5 minutes');

process.on('SIGINT', () => {
  task.stop();
  process.exit(0);
});
