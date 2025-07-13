import { Text, TouchableOpacity, View } from 'react-native';
const Detail = ({navigation}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Detail</Text>
        </TouchableOpacity>
        </View>
    );
}

export default Detail;