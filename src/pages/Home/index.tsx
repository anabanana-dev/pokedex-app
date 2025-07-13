import { Header } from '@react-navigation/stack';
import {List, Container, Content} from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
const Home = ({ navigation }) => {
    return (
        <Container>
            <Header/>
            <Content>
                <Title/>
                <List data={[]} renderItem={() => {}} />
            
            </Content>
        </Container>
    );
}

export default Home;