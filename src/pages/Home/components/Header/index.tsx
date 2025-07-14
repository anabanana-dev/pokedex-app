import pokeball from '../../../../../assets/pokeball.png'

import { Container, IconBall } from './styles';

const Header = () => {
    return (
      <Container>
        <IconBall source={pokeball} resizeMode='cover'/>
        </Container>
    );
}

export default Header;