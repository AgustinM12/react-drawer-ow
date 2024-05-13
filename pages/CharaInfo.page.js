import { View, Image, ScrollView, FlatList } from "react-native"
import { useFetchOw } from "../hooks/useFetchOw";
import { Divider, Text, List, ActivityIndicator } from "react-native-paper";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const CharaInfoPage = ({ route }) => {

    const { key } = route.params;

    const { data, loading } = useFetchOw(key)

    const AbilitieslistAcordion = ({ item }) => (
        <List.Accordion title={item.name} id={item.name}>
            <Text>
                {item.description}
            </Text>
        </List.Accordion>
    )

    const HistoryList = ({ item }) => (
        <List.Accordion title={item.title} id={item.title}>
            <Text>{item.content}</Text>
            <View style={{ width: scale(350), height: verticalScale(350), flex: 1, justifyContent: "center", alignSelf: "center" }}>
                <Image
                    source={{ uri: item.picture }}
                    style={{ flex: 1, resizeMode: 'contain' }}
                />
            </View>

        </List.Accordion>
    )

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
                    <FlatList
                        data={data?.abilities}
                        renderItem={({ item }) => <AbilitieslistAcordion item={item} />}
                        keyExtractor={item => item.name}
                    />
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
                    <FlatList
                        data={data?.story?.chapters}
                        renderItem={({ item }) => <HistoryList item={item} />}
                        keyExtractor={item => item?.title}
                    />
                </List.AccordionGroup>
                <Divider />
                <Text>Videos:{data?.story?.media?.link}</Text>
            </View>

            {/* videoId={data?.story?.media?.link} */}
        </ScrollView>
    )
}
