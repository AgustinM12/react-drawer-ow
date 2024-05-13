import { View, FlatList } from 'react-native';
import { Button, Card, Text, ActivityIndicator } from 'react-native-paper';
import { useFetchOw } from '../hooks/useFetchOw';
import { ImagesComponent } from '../components/Images.component';

export function OwScreen({ navigation }) {

    const { data, loading } = useFetchOw(false)

    /* //* colores: */
    /* 72aee2 */
    /* ef4444 */

    const OwCard = ({ item }) => (
        <Card key={item.key} mode='outlined' style={{ width: 300, backgroundColor: "#72aee2" }}>
            <Card.Title title={`Hero Name: ${item.name}`} subtitle={`Role: ${item.role}`}
                left={() => <ImagesComponent name={item.key} />} titleStyle={{ fontWeight: "bold", }} />

            <Card.Content>
                <Text style={{ fontWeight: 'bold' }}>Picture:</Text>
            </Card.Content>

            <Card.Cover source={{ uri: item.portrait }}
                style={{ height: 256, width: 256, flex: 1, justifyContent: "center", alignSelf: "center", borderWidth: 2, borderColor: "black" }} />

            <Card.Actions>
                <Button
                    onPress={() => navigation.navigate('Character Info', { key: item.key })} labelStyle={{ color: "white", textShadowRadius: 5, textShadowColor: "black" }}
                    style={{ backgroundColor: "#ffa200", borderColor: "black" }}>
                    View Info
                </Button>

            </Card.Actions>

        </Card>
    )

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="large" color='#ffa200' />
            </View>
        );
    }

    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 15, paddingBottom: 15, backgroundColor: "#e2ebfb" }}>
            {
                data.length > 0 ?
                    (<FlatList
                        data={data}
                        renderItem={({ item }) => <OwCard item={item} />}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    />) :
                    (<Text>
                        No hay personajes disponibles
                    </Text>)
            }
        </View>
    );
}