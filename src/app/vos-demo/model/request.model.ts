export class CreatePhoneRequest {
    public autoCreateAccount: boolean;  //M 
    public e164: string;                //M length - 64
    public password: string;            //O length - 32
    public displayNumber: string;       //O length - 64
    public lockType: number;            //O 0: No lock, 1: Lock call out, 2:Lock call in, 3: Lock all
    public callLevel:number;            //O 1:Net, 2:Local, 4: Domestic, 5: International
    public feerateGroup: string;        //O length - 255
    public monthlyMoneyMinimum: number; //O 
    public monthlyMoneyMaximum: number; //O
    public monthlyRentFee: number;      //O
    public rewriteRulesOutCallee: string;//O 65535
    public rewriteRulesInCallee: string;//O 65535
    public rewriteRulesInCaller: string;//O 65535
    public routingGatewayGroupsAllow: boolean; //O true: allow selected gateway group, false: Forbidden selected
    public routingGatewayGroups: string //O
    public account: string;             //O 64
    public equipment: string;           //O 64
    public calleeBilling: boolean       //O true: enable, false: disable
    public customerPassword: string;    //O 32
    public lineCallIn: number;          //O
    public lineCallOut: number          //O
    public lineCapacity:number;         //O
    public phoneBookLimit: number;      //O
    public callerLimitE164GroupsAllow:boolean; //O true: allow, false: forbidden selected caller group
    public callerLimitE164Groups:string;//O 255
    public calleeLimitE164Allow:boolean;//O
    public calleeLimitE164Groups:string;//O 255
    public memo:string; //O 255
    public infoPhoneValueAdded: InfoPhoneValueAdded;
    public infoPhoneAdditional: InfoPhoneAdditional;
}

export class InfoPhoneValueAdded{
}

export class InfoPhoneAdditional{
}