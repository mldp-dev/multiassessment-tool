'use client'


import { useState } from 'react';
import { Button, Typography, Row, Col } from 'antd'; // Import components from Ant Design
import { evaluateTypographicalErrors } from '../utils/typographicalUtils';

const { Title, Text } = Typography; // Destructure Typography components

const HomeContent: React.FC = () => {
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const phrase = "The quik brown fox jumps over the lazy dog. Thiss is an example off a sentennce withh typographical errorrs.";

  const handleTypographicalEvaluation = async () => {
    const result = await evaluateTypographicalErrors(phrase);
    setEvaluation(result);
  }

  return (
    <div style={{ padding: '20px' }}> {/* Add some padding for spacing */}
      <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)' }}> {/* Center content vertically */}
        <Col span={12}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Title level={2}>Typographical Error Evaluation</Title>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Text>{phrase}</Text> {/* Display the phrase */}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={handleTypographicalEvaluation}>Evaluate</Button>
          </div>
          {evaluation && (
            <div style={{ marginTop: '20px' }}>
              <Text>{evaluation}</Text> {/* Display the evaluation result */}
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default HomeContent;
