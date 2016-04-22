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
        renderRow={(rowData) => <Text>{rowData.username}</Text>}
      />
    );
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
  }
});

AppRegistry.registerComponent('reactNativeGAWorkshop', () => reactNativeGAWorkshop);
