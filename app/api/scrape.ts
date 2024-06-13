// pages/api/scrape.ts

import axios from 'axios';
import cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const url = 'https://www.transcosmos.com.ph/';
      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }

      const html = response.data;
      const $ = cheerio.load(html);
      const title = $('title').text(); // Extract the title of the website

      res.status(200).json({ title });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
