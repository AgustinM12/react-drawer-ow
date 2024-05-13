import { View, Image, ScrollView, FlatList } from "react-native"
import { useFetchOw } from "../hooks/useFetchOw";
import { Divider, Text, List, ActivityIndicator } from "react-native-paper";


export const CharaInfoPage = ({ route }) => {

    const { key } = route.params;

    const { data, loading } = useFetchOw(key)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="large" color='#ffa200' />
            </View>
        );
    }

    return (
        <ScrollView>
            <View>
                <Text>Nombre: {data.name}</Text>
                <Divider />
                <Text>Descripcion: {data.description}</Text>
                <Divider />
                <Text>Ubicacion: {data.location}</Text>
                <Divider />
                <Text>Fecha de Nacimiento: {data.birthday}</Text>
                <Divider />
                <Text>Edad: {data.age}</Text>
                <Divider />
                <Text>Habilidades</Text>
                <Divider />
                <List.AccordionGroup>
                    {
                        data?.abilities?.map((ability, key) => (
                            <List.Accordion title={ability.name} id={key}>
                                <Text>
                                    {ability.description}
                                </Text>
                            </List.Accordion>
                        ))
                    }
                </List.AccordionGroup>
                <Text>Historia:</Text>
                <List.Accordion title="Resumen">
                    <Text>
                        {data?.story?.summary}
                    </Text>
                </List.Accordion>
                <Divider />
                <Text>Capitulos de historia:</Text>
                <Divider />
                <List.AccordionGroup>
                    {
                        data?.story?.chapters?.map((chapter, key) => (
                            <List.Accordion title={chapter.title} id={key}>
                                <Text>{chapter.content}</Text>
                                <View style={{ width: 350, height: 350, flex: 1, justifyContent: "center", alignSelf: "center" }}>
                                    <Image
                                        source={{ uri: chapter.picture }}
                                        style={{ flex: 1, resizeMode: 'contain' }}
                                    />
                                </View>

                            </List.Accordion>
                        ))
                    }
                </List.AccordionGroup>
            </View>
            <Divider />
            <Text>Videos:{data?.story?.media?.link}</Text>

            {/* videoId={data?.story?.media?.link} */}
        </ScrollView>
    )
}
