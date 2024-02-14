'use client'

import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function TaskSearch({ onSearch, onUpdateSearchHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchHistory(prevHistory => [...prevHistory, searchTerm]);
    setSearchTerm('');
  };

  const handleRemoveFilter = (index) => {
    setSearchHistory(prevHistory => {
      const updatedHistory = prevHistory.filter((_, i) => i !== index);
      onUpdateSearchHistory(updatedHistory);
      return updatedHistory;
    });
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col>
          <Form>
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                placeholder="Pesquisar tarefa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSearch}>Pesquisar</Button>
          <div>
            {searchHistory.map((term, index) => (
              <Button variant="secondary" onClick={() => handleRemoveFilter(index)} key={index}>{term} <span>x</span></Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskSearch;
