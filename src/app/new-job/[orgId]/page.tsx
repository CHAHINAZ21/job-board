import { getUser } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node";
import '@radix-ui/themes/styles.css';
import JobForm from "@/app/components/jobForm";


type PageProps = {
    params:{
        orgId: string;
    }
}

export default async function NewJobForOrgPage(props:PageProps){

    
    const {user} = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user ) {
        return (
        <p className="container">please log in</p>
    )} 
    const orgId = props.params.orgId;
    const oms = await workos.userManagement.listOrganizationMemberships({userId:user.id, organizationId:orgId});
    const hasAccess =oms.data.length > 0;
    if (!hasAccess){
        return (
            <p className="container">You do not have access to this organization</p>

        )
          
    }
    
    return (
      <div>
         <JobForm/> 
      </div>
            
    )
}