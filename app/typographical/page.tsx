import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Typography, Row, Col, Button } from 'antd';

const { Title, Text } = Typography;

interface ApiResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

const TypographicalPage: React.FC = () => {
  const [phrase, setPhrase] = useState('');
  const [evaluation, setEvaluation] = useState<string | null>(null);

  const handleAzure = async () => {
    const body = {
      messages: [
        { role: 'system', content: 'Check if there\'s typographical error. Count the correct words and incorrect words. Get the percentage of correct words.' },
        { role: 'user', content: phrase }
      ],
    };
    try {
      const res: AxiosResponse<ApiResponse> = await axios.post(
        'https://gltcap-az0016-sub4-je-2-oai.openai.azure.com/openai/deployments/deploy-gpt-4/chat/completions?api-version=2023-12-01-preview',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': '8d49d1b2832e4ea0a4fa3c126e0c2202'
          },
        }
      );
      const response = res.data.choices[0]?.message.content ?? '';
      setEvaluation(response);
    } catch (error) {
      console.error("Error evaluating typographical errors:", error);
    }
  };

  const renderEvaluation = (evaluation: string) => {
    // Split the evaluation by newline to separate each line
    const lines = evaluation.split('\n');
    return lines.map((line, index) => {
      const parts = line.split(':');
      return (
        <div key={index}>
          <Text strong>{parts[0]}:</Text> <Text>{parts[1]}</Text> <Text>{parts[2]}</Text>
          <br />
        </div>
      );
    });
  };

  return (
    <div style={{ padding: '1px' }}>
      <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Col span={12}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Title level={2}>Typographical Error Evaluation</Title>
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="chatbox"
              className="w-full border-2 border-red-300 rounded-md p-2"
              onChange={(e) => setPhrase(e.target.value)}
              value={phrase}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={handleAzure}>Evaluate</Button>
          </div>
          {evaluation && (
            <div style={{ marginTop: '20px' }}>
              {renderEvaluation(evaluation)}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TypographicalPage;
