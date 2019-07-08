import React, {Component} from 'react';
import {FlatList,Button,View,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Modal,ScrollView,Text,Dimensions} from 'react-native';
import Checkbox from '../markers/checkbox.js';
import {SafeAreaView} from 'react-navigation'
import Icon from '../markers/icon.js';
import SearchBar from '../markers/searchbar.js';
import {pastillesValues} from '../array/description'
import {bindActionCreators} from 'redux'
import {resetResults} from '../../redux/actions'
import {moveWines,fetchWines} from '../../functions/api'
import {connect} from 'react-redux'
function mapStateToProps(state,props){
  return{
    cellars : state.cellars || [],
    wines : props.navigation.getParam('selected') || [state.wine._id],
    cellarId : props.navigation.getParam('cellarId') || state.wine.cellarId,
    search : state.search || {}
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({moveWines,fetchWines,resetResults}, dispatch)
}
class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'black' : '#4c4c4c';
    return (
      <TouchableOpacity onPress={this._onPress} >
        <View style={{flexDirection:'row',alignItems:'center',borderColor:"lightgray",borderBottomWidth:1,paddingVertical:10}}>
           <Checkbox
             onPress={this._onPress}
            checked={this.props.checked}
          />
          <Text style={{color: textColor}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


class ChoseCellar extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {selected: []};
    this._onPressItem = this._onPressItem.bind(this)

  }


  _keyExtractor = (item, index) => item._id;

  _onPressItem = (id: string) => {

    Keyboard.dismiss()
    let all = this.props.navigation.getParam('all') || false
    this.props.moveWines(all,this.props.wines,this.props.cellarId,id)
    this.props.navigation.navigate('wines')
    this.props.resetResults()
    this.props.fetchWines('',{cellarId:this.props.cellarId,keyOrder:this.props.search.keyOrder || 'region',order:(this.props.search.order || 1), limit:this.state.limit+10})
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item._id}
      onPressItem={this._onPressItem}
      checked={this.props.cellarId == item._id.toString()}
      title={item.name}
    />
  );

  render() {
      let data = this.props.cellars
    return (

      <SafeAreaView style={{flex:1}}>
      <Text
        style={{
          color:"#262626",
          fontWeight:"800",
          fontSize: 20,
          alignSelf:'center',
          marginHorizontal: 10,
          marginVertical: 3}}>{"Choisir une cave"}</Text>
            <FlatList
              data={data}
              keyboardShouldPersistTaps={'always'}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
            <Button
            onPress={() => this.props.navigation.goBack()}
            title="Fermer"
          />
        </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps,matchDispatchToProps)(ChoseCellar)
