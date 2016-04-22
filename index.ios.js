/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
  ListView,
  TouchableHighlight,
  Image,
  View,
  Text
} from 'react-native';

class reactNativeGAWorkshop extends Component {
  render() {
    return (
     <NavigatorIOS
        style={styles.container}
        barTintColor='red'
        titleTextColor='#ffffff'
        initialRoute={{
          component: MyListView,
          title: 'List Of People'
        }}
      />
    );
  }
}

class MyListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  }

  componentDidMount() {
    fetch('https://api.fieldbook.com/v1/5676d9a0be5b1f03002f63e9/ga_students_wdi_sg_discussions')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
        });

      })
      .done();
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <UserBox {...rowData} navigator={this.props.navigator} />}
      />
    );
  }
}


class UserBox extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => {
            this.props.navigator.push({
              title: this.props.displayname,
              component: UserProfileScreen,
              passProps: this.props
            })
          }}
        >
          <View style={styles.userBox} >
            <Text>{this.props.username}</Text>
            <Text>{this.props.displayname}</Text>
          </View>
      </TouchableHighlight>
    );
  }
}

class UserProfileScreen extends Component {
  render() {
    return (
      <View style={styles.userProfileScreen} >
        <Image
          style={styles.profilePic}
          source={{uri: this.props.avatarurlmedium}}
          />
        <Text>{this.props.username}</Text>
        <Text>{this.props.displayname}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  listViewContainer: {
    flex: 1,
    backgroundColor: 'blue'
  },
  userBox: {
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#f5f5f5'
  },
  userProfileScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 500
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 5
  }
});

AppRegistry.registerComponent('reactNativeGAWorkshop', () => reactNativeGAWorkshop);
