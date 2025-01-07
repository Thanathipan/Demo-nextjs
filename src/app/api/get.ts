import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Handle GET request
      res.status(200).json({ message: "GET request successful", data: [] });
      break;

    case "POST":
      // Handle POST request
      const postData = req.body;
      res.status(201).json({ message: "POST request successful", data: postData });
      break;

    case "PATCH":
      // Handle PATCH request
      const patchData = req.body;
      res.status(200).json({ message: "PATCH request successful", data: patchData });
      break;

    case "DELETE":
      // Handle DELETE request
      res.status(200).json({ message: "DELETE request successful" });
      break;

    default:
      // Handle other or unknown methods
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
