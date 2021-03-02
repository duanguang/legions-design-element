import { JsonProperty } from 'json-mapper-object';

export class ResponseVModelNameDataEntity {
  @JsonProperty('key')
  key = void 0;
  @JsonProperty('name')
  name = void 0;
  @JsonProperty('age')
  age = void 0;
  @JsonProperty('address')
  address = void 0;
}

export class MaterialsInfosDataEntity {
  @JsonProperty('id')
  id = void 0

  @JsonProperty('companyUid')
  companyUid = void 0

  @JsonProperty('createrId')
  createrId = void 0

  @JsonProperty('updaterId')
  updaterId = void 0

  @JsonProperty('createrName')
  createrName = ''

  @JsonProperty('updaterName')
  updaterName = ''

  @JsonProperty('createTime')
  createTime = ''

  @JsonProperty('updateTime')
  updateTime = ''

  @JsonProperty('groupName')
  groupName = ''

  @JsonProperty('groupUid')
  groupUid = void 0

  @JsonProperty('version')
  version = ''

  @JsonProperty('companyCode')
  companyCode = void 0

  @JsonProperty('typeName')
  typeName = ''

  /* @JsonProperty('itemNo')
  itemNo = '' */

  @JsonProperty('gname')
  gname = ''

  @JsonProperty('gmodel')
  gmodel = ''

  @JsonProperty('unit')
  unit = ''

  @JsonProperty('unitName')
  unitName = ''

  @JsonProperty('commodityCode')
  commodityCode = ''

  @JsonProperty('declareElement')
  declareElement = ''

  @JsonProperty('declareDesc')
  declareDesc = ''

  @JsonProperty('price')
  price = ''

  @JsonProperty('curr')
  curr = ''

  @JsonProperty('netWt')
  netWt = ''

  @JsonProperty('grossWt')
  grossWt = ''

  @JsonProperty('unitWeight')
  unitWeight = ''

  @JsonProperty('note')
  note = ''

  @JsonProperty('orgCountry')
  orgCountry = ''

  @JsonProperty('itemSeqNo')
  itemSeqNo = ''

  @JsonProperty('baseCommodityItemNo')
  baseCommodityItemNo = ''

  @JsonProperty('itemAttr')
  itemAttr = ''

  @JsonProperty('state')
  state = ''

  stateDesc = {'1':'启用' ,'2':'禁用'}

  @JsonProperty('gdescEn')
  gdescEn = ''

  @JsonProperty('goodsCode')
  goodsCode = ''

  @JsonProperty('goodsName')
  goodsName = ''

  @JsonProperty('goodsSpec')
  goodsSpec = ''

  @JsonProperty('declareName')
  declareName = ''

  @JsonProperty('globalUnitName')
  globalUnitName = ''

  @JsonProperty('secondaryUnitName')
  secondaryUnitName = ''

  @JsonProperty('rate1')
  rate1 = ''

  @JsonProperty('unitGlobalRate')
  unitGlobalRate = ''

  @JsonProperty('unitSecondaryRate')
  unitSecondaryRate = ''

  @JsonProperty('declareGlobalRate')
  declareGlobalRate = ''

  @JsonProperty('declareSecondaryRate')
  declareSecondaryRate = ''

  get itemNo() {
      return this.gname+this.goodsCode
  }
}
export class MaterialsInfosEntity{

  @JsonProperty({clazz:MaterialsInfosDataEntity, name:'data'})
  data = []

  @JsonProperty('size')
  size = 0

  @JsonProperty('current')
  current = 0

  @JsonProperty('total')
  total = 0
}



