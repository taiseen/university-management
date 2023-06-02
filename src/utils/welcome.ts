import { Request, Response } from 'express';

const welcome = (req: Request, res: Response) => {
  const style = `style="color:tomato; text-align:center; font-size:80px; font-family:arial;"`;

  const data = `
    <div>
        <h1 ${style}>Auth Service!</h1>
    </div>`;

  res.send(data);
};

export default welcome;
