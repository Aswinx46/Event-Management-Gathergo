
import React from "react";
import { motion } from "framer-motion";
import { Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EventType } from "@/types/EventType";

interface TicketFormProps {
  values: EventType;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const TicketForm: React.FC<TicketFormProps> = ({ values }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-lg shadow-sm mb-8"
    >
      <motion.h3 
        variants={itemVariants} 
        className="text-xl font-semibold mb-6 text-purple-800"
      >
        Ticket Information
      </motion.h3>
      
      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="pricePerTicket" className="block text-sm font-medium mb-1">
          Price Per Ticket <span className="text-red-500">*</span>
        </Label>
        <Field
          as={Input}
          id="pricePerTicket"
          name="pricePerTicket"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          className="w-full"
        />
        <ErrorMessage name="pricePerTicket" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="totalTicket" className="block text-sm font-medium mb-1">
          Total Number of Tickets <span className="text-red-500">*</span>
        </Label>
        <Field
          as={Input}
          id="totalTicket"
          name="totalTicket"
          type="number"
          min="1"
          placeholder="100"
          className="w-full"
        />
        <ErrorMessage name="totalTicket" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="maxTicketsPerUser" className="block text-sm font-medium mb-1">
          Max Tickets Per User <span className="text-red-500">*</span>
        </Label>
        <Field
          as={Input}
          id="maxTicketsPerUser"
          name="maxTicketsPerUser"
          type="number"
          min="1"
          placeholder="4"
          className="w-full"
        />
        <ErrorMessage name="maxTicketsPerUser" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>
    </motion.div>
  );
};

export default React.memo(TicketForm);