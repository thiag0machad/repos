import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Container } from './styles';

export default function Repository() {
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const { repository } = useParams();

  useEffect(() => {
    async function load() {
      const [repositoryData, issuesData] = await Promise.all([
        api.get(`/repos/${repository}`),
        api.get(`/repos/${repository}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setRepo(repositoryData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();
  }, [repository]);

  return <Container></Container>;
}
