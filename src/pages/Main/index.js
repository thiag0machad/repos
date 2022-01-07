import { Container, Form, SubmitButton } from './styles';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    async function submit() {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name
      };

      setRepositories([...repositories, data]);
      setNewRepo('');
    }

    submit();
  }, [newRepo, repositories]);

  function handleInputChange(event) {
    setNewRepo(event.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Adicionar Repositórios'
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton>
          <FaPlus color='#FFF' size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
