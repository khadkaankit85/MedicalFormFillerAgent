//this is the main entrypoint for api
import express, { Request, Response } from 'express';
import { runWorkflow } from './workflow';

const app = express();
app.use(express.json());

app.get('/run-workflow', async (_req: Request, res: Response) => {
  try {
    const result = await runWorkflow();
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

app.post('/run-workflow', async (req: Request, res: Response) => {
  try {
    const result = await runWorkflow(req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
