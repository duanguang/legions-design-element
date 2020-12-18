import { PageEntity, IPageEntity } from './common/pageEntity';
declare class MockEntity {
    id: undefined;
    companyId: undefined;
    loginId: undefined;
    name: undefined;
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
