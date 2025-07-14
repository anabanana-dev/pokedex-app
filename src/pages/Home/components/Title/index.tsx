import Text from '../../../../components/Text';
import { Container } from './styles';

const Title = () => {
    return (
        <Container>
            <Text bold variant= 'title'>Pokédex</Text>
            <Text style={{ fontSize: 16, color: '#666' }}>Encontre seu Pokémon favorito pela Pokédex</Text>
        </Container>
    );
}

export default Title;
