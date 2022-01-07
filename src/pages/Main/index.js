import { Container, Form, SubmitButton } from './styles';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      async function submit() {
        setLoading(true);
        try {
          const response = await api.get(`/repos/${newRepo}`);

          const data = {
            name: response.data.full_name
          };

          setRepositories([...repositories, data]);
          setNewRepo('');
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories]
  );

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

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color='#fff' size={14} />
          ) : (
            <FaPlus color='#FFF' size={14} />
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
