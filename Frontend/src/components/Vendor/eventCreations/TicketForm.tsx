/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EventType, TicketType } from "@/types/EventType";
import { Button } from "@/components/ui/button";
import TicketVariantModal from "./TicketVariantAddingModal";
import { Pencil } from "lucide-react";

interface TicketFormProps {
  values: EventType;
  setFieldValue: (field: string, value: any) => void;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TicketForm: React.FC<TicketFormProps> = ({ setFieldValue }) => {
  const [showTicketVariantAddModal, setShowTicketVariantAddModal] = useState(false)
  const [currentAddedTickets, setCurrentAddedTickets] = useState<TicketType[] | undefined>(undefined)
  const handleAddTicketVariant = (tickets: TicketType[]) => {
    console.log('This is the Ticket Details', tickets)
    setCurrentAddedTickets(tickets)
    setFieldValue('ticketTypeDescription', tickets)
    setFieldValue('multipleTicketTypeNeeded', true)
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-lg shadow-sm mb-8"
    >
      {showTicketVariantAddModal && <TicketVariantModal isOpen={showTicketVariantAddModal} onClose={() => setShowTicketVariantAddModal(false)} onSubmit={handleAddTicketVariant} currentCreatedTickets={currentAddedTickets ?? undefined} />}
      <motion.h3
        variants={itemVariants}
        className="text-xl font-semibold mb-6 text-purple-800"
      >
        Ticket Information
      </motion.h3>
      {/* 
      <motion.div className="flex ">
        <motion.h1 className="block text-black text-sm font-medium mb-1" > Do You need ticket variants </motion.h1>
        <motion.input type="checkbox" />
      </motion.div> */}

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
          Max Tickets Per User (You can avoid this if you are adding ticket types)
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
      <Button onClick={() => setShowTicketVariantAddModal(!showTicketVariantAddModal)}>Add Ticket Variants</Button>
      {currentAddedTickets && <div className="space-y-4 mt-4">
        {currentAddedTickets.map((ticket, index) => (
          <div
            key={index}
            className="border p-4 rounded-xl shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{ticket.ticketType}</h3>
              <p className="text-sm text-muted-foreground">{ticket.description}</p>
              <div className="mt-2 text-sm space-x-4">
                <span>💰 Price: ₹{ticket.price}</span>
                <span>🎫 Max Count: {ticket.maxCount}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTicketVariantAddModal(true)}
              className="flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          </div>
        ))}
      </div>}
    </motion.div >
  );
};

export default React.memo(TicketForm);