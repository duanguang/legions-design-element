import {JsonProperty} from 'json-mapper-object';
import {BaseEntity} from './common/baseEntity';
class UserEntity{


    /**
     * 姓名
     *
     * @memberof UserEntity
     */
    @JsonProperty('name')
    name = void 0;


    /**
     * 年龄
     *
     * @memberof UserEntity
     */
    @JsonProperty('age')
    age = void 0;
}
export class MockEntity{
    @JsonProperty('id')
    id = void 0

    @JsonProperty('companyId')
    companyId = void 0

    @JsonProperty('loginId')
    loginId:number = -1

    /**
     * 用户信息
     *
     * @memberof MockEntity
     */
    @JsonProperty({clazz:UserEntity,name:'user'})
    user = new UserEntity()
}

interface IMockEntity{
    msg:string,
    ok:boolean,
    status:string,
    data:MockEntity
}
export class MockContainerEntity extends BaseEntity<MockEntity>{
    constructor(fromJson:IMockEntity){
       // @ts-ignore
        super(fromJson);
        this.message=fromJson.msg||'查询成功';
        this.success=fromJson.ok||true;
        this.code=fromJson.status||'';
        let data = fromJson.data
        if(fromJson&&data){
            this.result=super.transformRow(data,MockEntity)
        }
    }
}
export class StockModeTableEntity{
    /** 申报单位名称 */
    @JsonProperty('bizopEtpsNm')
    bizopEtpsNm:string = ''
    /** 申报单位编码 */
    @JsonProperty('bizopEtpsNo')
    bizopEtpsNo:string = ''
    /** 申报单位社会信用代码 */
    @JsonProperty('bizopEtpsSccd')
    bizopEtpsSccd:string = ''
    /** 创建时间 */
    @JsonProperty('createTime')
    createTime:string = ''
    /** 出货模式名称 */
    @JsonProperty('exportsGoodsModel')
    exportsGoodsModel:string = ''
    /** id */
    @JsonProperty('id')
    id:number = 0
    /** 进出境关别code */
    @JsonProperty('ieCustomCode')
    ieCustomCode:string = ''
    /** 进出境关别名称 */
    @JsonProperty('ieCustomName')
    ieCustomName:string = ''
    /** 入离境口岸code */
    @JsonProperty('iePort')
    iePort:string = ''
    /** 入离境口岸名称 */
    @JsonProperty('iePortName')
    iePortName:string = ''
    /** 申报地海关code */
    @JsonProperty('masterCuscd')
    masterCuscd:string = ''
    /** 申报地海关名称 */
    @JsonProperty('masterCuscdName')
    masterCuscdName:string = ''
    /** 运输方式code */
    @JsonProperty('trafMode')
    trafMode:string = ''
    /** 运输方式名称 */
    @JsonProperty('trafModeName')
    trafModeName:string = ''
    /** 对应报关单申报单位code */
    @JsonProperty('corrEntryDclEtpsNo')
    corrEntryDclEtpsNo:string = ''
    /** 对应报关单申报单位名称 */
    @JsonProperty('corrEntryDclEtpsNm')
    corrEntryDclEtpsNm :string = ''
}
export class StockModeResultEntity {
	@JsonProperty({ clazz: StockModeTableEntity, name: 'records' })
	records: Array<StockModeTableEntity> = []

	@JsonProperty('total')
	total = 0
}
interface IBaseEntity<T> {
	msg: string,
	status: number,
	ok: boolean,
	data: T,
}
export class StockModeContainerEntity extends BaseEntity<StockModeResultEntity>{
	constructor(fromJson: IBaseEntity<StockModeResultEntity>) {
		super();
		this.message = fromJson.msg || '查询成功';
		this.success = fromJson.ok || false;
		this.code = fromJson.status;
		if (this.success) {
			this.result = super.transformRow(fromJson.data, StockModeResultEntity);
		}
		else {
			this.result = new StockModeResultEntity();
		}
	}
}
