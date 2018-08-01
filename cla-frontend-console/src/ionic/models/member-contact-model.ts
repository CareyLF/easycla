export class MemberContactModel {

  // This project definition is based on CINCO ProjectMemberContactRole and OrganizationContact class
  id: string; // ProjectRoleId
  memberId: string;
  type: string;
  primaryContact: boolean;
  boardMember: boolean;
  contact: {
    id: string,
    accountId: string,
    givenName: string,
    familyName: string,
    title: string,
    bio: string,
    email: string,
    phone: string,
    type: string
  }

  constructor() {
  }

}