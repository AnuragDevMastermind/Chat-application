import { UserResponse } from "@repo/datamodel/user";
import ic_person_1_color from "../../assets/ic_person_1_color.png";

interface ContactItemProps {
  user: UserResponse;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ user, onClick }) => {
  return (
    <div onClick={onClick} className="w-full flex mx-5 mb-7">
      <img className="w-12 h-12 rounded-lg" src={ic_person_1_color} alt="" />
      <div className="w-3" />
      <div>
        <p className="text-sm font-serif font-semibold">{user.name}</p>
        <p className="text-xs font-serif font-semibold text-txt-2">
          Available
        </p>
      </div>
    </div>
  );
};

export default ContactItem;
