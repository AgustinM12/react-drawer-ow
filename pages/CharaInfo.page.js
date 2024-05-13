import { View, Image, FlatList } from "react-native";
import { useFetchOw } from "../hooks/useFetchOw";
import { Divider, Text, List, ActivityIndicator } from "react-native-paper";
import { scale, verticalScale } from 'react-native-size-matters';

export const CharaInfoPage = ({ route }) => {
    const { key } = route.params;
    const { data, loading } = useFetchOw(key);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="large" color='#ffa200' />
            </View>
        );
    }

    return (
        <FlatList
            data={[
                { key: 'name', value: data.name },
                { key: 'description', value: data.description },
                { key: 'location', value: data.location },
                { key: 'birthday', value: data.birthday },
                { key: 'age', value: data.age },
                { key: 'summary', value: data?.story?.summary },
                { key: 'abilities', value: data.abilities },
                { key: 'chapters', value: data?.story?.chapters },
                { key: 'mediaLink', value: data?.story?.media?.link }
            ]}
            renderItem={({ item }) => {
                switch (item.key) {
                    case 'abilities':
                        return (
                            <>
                                <Text key="abilitiesHeader" style={{ textDecorationLine: "underline", textAlign: "center" }}>Abilities:</Text>
                                <Divider key="abilitiesDivider" />
                                <FlatList
                                    data={item.value}
                                    renderItem={({ item }) => (
                                        <List.Accordion title={item.name} id={item.name}>
                                            <Text style={{ paddingHorizontal: 10 }}>{item.description}</Text>
                                        </List.Accordion>
                                    )}
                                    keyExtractor={(item) => item.name}
                                />
                            </>
                        );
                    case 'chapters':
                        return (
                            <>
                                <Text key="historyHeader" style={{ textDecorationLine: "underline", textAlign: "center" }}>Stories:</Text>
                                <Divider key="historyDivider" />
                                <FlatList
                                    data={item.value}
                                    renderItem={({ item }) => (
                                        <List.Accordion title={item.title} id={item.title}>
                                            <Text style={{ paddingHorizontal: 10 }}>{item.content}</Text>
                                            <View style={{ width: scale(350), height: verticalScale(350), flex: 1, justifyContent: "center", alignSelf: "center" }}>
                                                <Image
                                                    source={{ uri: item.picture }}
                                                    style={{ aspectRatio: 1, resizeMode: "stretch", borderColor: "#ffa200", borderWidth: 2, borderRadius: 25, margin: 15 }}
                                                />
                                            </View>
                                        </List.Accordion>
                                    )}
                                    keyExtractor={(item) => item.title}
                                />
                            </>
                        );
                    default:
                        return (
                            <>
                                <Text key={item.key}>{item.key[0].toUpperCase() + item.key.slice(1)}: {item.value}</Text>
                                <Divider />
                            </>
                        );
                }
            }}
        />
    );
};
