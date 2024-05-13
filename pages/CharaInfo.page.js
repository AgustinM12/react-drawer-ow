import { View, Image, FlatList, Alert, Button } from "react-native";
import { useFetchOw } from "../hooks/useFetchOw";
import { Divider, Text, List, ActivityIndicator } from "react-native-paper";
import { scale, verticalScale } from 'react-native-size-matters';
import { ImagesComponent } from "../components/Images.component";
import YoutubePlayer from "react-native-youtube-iframe";
import { useState, useCallback, useRef } from "react";

export const CharaInfoPage = ({ route }) => {

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

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
                { key: 'role', value: data.role },
                { key: 'description', value: data.description },
                { key: 'location', value: data.location },
                { key: 'birthday', value: data.birthday },
                { key: 'age', value: data.age },
                { key: 'portrait', value: data.portrait },
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
                                        <List.Accordion title={item.name} id={item.name} left={() => <ImagesComponent url={item.icon} />}>
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
                    case 'portrait':
                        return (
                            <>
                                <Text style={{ textAlign: "center", textDecorationLine: "underline" }}>{item.key[0].toUpperCase() + item.key.slice(1)}:</Text>
                                <Image
                                    source={{ uri: item.value }}
                                    style={{ aspectRatio: 1, resizeMode: "stretch", borderColor: "#ffa200", borderWidth: 2, borderRadius: 25, marginVertical: 15, marginLeft: 'auto', marginRight: 'auto' }}
                                />

                            </>
                        )
                    case 'mediaLink':
                        return (
                            <View style={{ padding: 20 }}>
                                <Text style={{ textAlign: "center", textDecorationLine: "underline" }}>Introduction Cinematic:</Text>
                                <YoutubePlayer
                                    height={300}
                                    play={playing}
                                    videoId={item.value.slice(17)}
                                    onChangeState={onStateChange}
                                />
                            </View>
                        )
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
