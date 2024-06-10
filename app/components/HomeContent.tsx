'use client'

import React, { useState } from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { evaluateTypographicalErrors } from '../utils/typographicalUtils';

const { Title, Text } = Typography;

const HomeContent: React.FC = () => {
    const [evaluation, setEvaluation] = useState<string | null>(null);
    const phrase = "The quik brown fox jumps over the lazy dog. Thiss is an example off a sentennce withh typographical errorrs.";

    const handleTypographicalEvaluation = async () => {
        try {
            const result = await evaluateTypographicalErrors(phrase);
            setEvaluation(result);
        } catch (error) {
            console.error("Error evaluating typographical errors:", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)' }}>
                <Col span={12}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Title level={2}>Typographical Error Evaluation</Title>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <Text>{phrase}</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={handleTypographicalEvaluation}>Evaluate</Button>
                    </div>
                    {evaluation && (
                        <div style={{ marginTop: '20px' }}>
                            <Text>{evaluation}</Text>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default HomeContent;
