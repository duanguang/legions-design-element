import { PageEntity, IPageEntity } from './common/pageEntity';
declare class MockEntity {
    id: any;
    companyId: any;
    loginId: any;
    name: any;
}
interface IMockEntity {
    msg: string;
    ok: boolean;
    status: string;
    data: IPageEntity<MockEntity>;
}
export declare class MockPageListEntity extends PageEntity<MockEntity> {
    constructor(fromJson: IMockEntity);
}
export {};
