import {Urgency} from "~/types";

export default function getBackgroundUrgencyColor(urgency:Urgency):string{

    switch (urgency){
        case Urgency.LOW :
            return  "bg-green-500"
        case Urgency.MEDIUM :
            return "bg-blue-500"
        case Urgency.HIGH :
            return "bg-yellow-500"
        case Urgency.URGENT :
            return "bg-red-500"
        case Urgency.CRITICAL :
            return "bg-red-900"
        default:
            return "bg-gray-500"
    }
}