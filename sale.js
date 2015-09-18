'use strict';

var React = require('react-native');
var Banner = require('./banner');
var Tabs = require('./tabs');
var Dimensions = require('Dimensions');
var {
  width,
  height
} = Dimensions.get('window');

var {
  Image,
  ListView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var ajaxUrl = "http://www.mogujie.com/act/mce/get_wall";

var GridList = React.createClass({

  /**
  * Props Validation
  * @type {Object}
  */
  propTypes: {
    ajaxUrl                          : React.PropTypes.string,
    catId                            : React.PropTypes.number,
    style                            : View.propTypes.style,
    column                           : React.PropTypes.number,
    itemWidth                        : React.PropTypes.number,
    itemHeight                       : React.PropTypes.number
  },

  getInitialState() {
    let props = this.props
    let column = props.column || 2
    let cw = props.itemWidth
    let ch = props.itemHeight

    if(!props.itemWidth){
      cw = (width-(column)*10)/column;
    }

    if(!props.itemHeight){
      ch = cw*215/145;
    }

    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      itemWidth: cw,
      itemHeight: ch,
      column: column,
      cateId: '123y'
    };
  },

  //更新分类ID
  handleUpdateList(cateId) {
    this.setState({
        cateId : cateId
    })
    this.fetchData();
  },

  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    var cateId = this.state.cateId,
        apiUrl = cateId ? ajaxUrl + '?mceId=' + this.state.cateId : ajaxUrl;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.result.list),
            loaded: true
        });
        this.cacheData = responseData.result.list;
    })
    .done();
  },


  render() {
    let state = this.state
    let props = this.props

    var style = state.column > 1 ? styles.column : {paddingVertical: 5};

    if(!state.loaded){
      return(
        <ActivityIndicatorIOS
          style={[styles.centering, styles.gray, {height: 500}]} />
      );
    };
    console.log('......jsSide begin to setup View via RN......');
    console.log('......jsSide set stickyHeaderIndices={[1]}......');
    return (
      <ListView contentContainerStyle={[style, props.style,{marginTop: -20}]}
        dataSource={state.dataSource}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}               //It doesn't work
        renderHeader={this._renderHeader}
        renderRow={this._renderRow}>
      </ListView>
    );
  },

  _renderHeader() {
    return (
      <View style={{width:width,marginTop:-10}}>
        <Banner/>
        <Tabs onChange={this.handleUpdateList}/>
      </View>
    );
  },

  _renderRow(item) {
    let state = this.state

    return (
      <TouchableWithoutFeedback key={item.shopId}>
        <View ref='listRow'
          style={[styles.row,{width:state.itemWidth, height:state.itemHeight+92} ]}>
            <Image source={{uri:item.img}}
              style={[styles.img,{ width:state.itemWidth, height:state.itemHeight}]} />
            <View style={styles.goodsInfoBoxView}>
                <Text style={styles.text} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.price}>
                    {'￥'+item.nowPrice}
                </Text>
                <View style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>立即购买</Text>
                </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

var styles = StyleSheet.create({

  column: {
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    margin: 5,
    borderColor: '#CCC',
    overflow: 'hidden',
    borderWidth : 0.5,
  },

  goodsInfoBoxView: {

    overflow: 'hidden'
  },

  text: {
    flex: 1,
    marginTop: 2,
    fontSize: 14,
    padding: 3,
    color: '#666',
    paddingLeft: 8,
    paddingBottom: 0
  },

  price: {
    flex: 1,
    marginTop: 5,
    color: '#ee4566',
    fontSize: 14,
    paddingLeft: 8
  },

  buyButton: {
    backgroundColor: '#ff4280',
    margin: 8,
    height : 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buyButtonText: {
    fontSize: 16,
    color: '#fff'
  },

  centering: {
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  moreBox:{
    width:140,
    height:35,
    backgroundColor:'#ccc'
  }

});

module.exports = GridList;
