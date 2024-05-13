import { Image, View } from 'react-native';

export const ImagesComponent = ({ name, url }) => {
    const roleList = {
        dps: ["ashe", "bastion", "cassidy", "echo", "genji", "hanzo", "junkrat", "mei", "pharah", "reaper", "sojourn", "soldier-76", "sombra", "symmetra", "torbjorn", "tracer", "venture", "widowmaker"],
        tank: ["dva", "doomfist", "junker-queen", "mauga", "orisa", "ramattra", "reinhardt", "roadhog", "sigma", "winston", "wrecking-ball", "zarya"],
        supp: ["ana", "baptiste", "brigitte", "illari", "kiriko", "lifeweaver", "lucio", "mercy", "moira", "zenyatta"],
    }

    return (
        <View style={{
            width: 35,
            height: 35,
            borderRadius: 50,
            borderColor: "white",
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray"
        }}>
            {name ?
                (<Image
                    source={roleList.tank.includes(name) ? require('../assets/Tank.png') :
                        roleList.dps.includes(name) ? require('../assets/Dps.png') :
                            roleList.supp.includes(name) ? require('../assets/Supp.png') : null}
                    style={{ width: 24, height: 24 }}
                />) : (
                    <Image
                        style={{ width: 20, height: 10, resizeMode: "stretch" }}
                        source={{ uri: url }}
                    />
                )}
        </View>

    );
};



