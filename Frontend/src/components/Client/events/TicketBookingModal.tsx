import { motion } from "framer-motion";
import { useState } from "react";
import { CalendarIcon, MapPin, Minus, Plus, Ticket } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Dialog, DialogContent } from "../../ui/dialog";
import { EventType } from "@/types/EventType";
import { useNavigate } from "react-router-dom";
import { TicketEntity } from "@/types/TicketPaymentType";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import PaymentMethodModal from "@/components/other components/paymentSelection/PaymenSelectionModal";
import { toast } from "react-toastify";

type TicketPurchaseProps = {
  event: EventType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Errors = {
  email?: string;
  phone?: string;
};

const TicketPurchase = ({ event, open, setOpen }: TicketPurchaseProps) => {
  const [ticketCount, setTicketCount] = useState(0);
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [totalTicketPrice, setTotalTicketPrice] = useState(0)
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showChoosePaymentModal, setShowChoosePaymentModal] = useState<boolean>(false)
  const [_paymentMethod, SetPaymentMethod] = useState<string>('')
  const navigate = useNavigate()
  const availableTickets = event.totalTicket - event.ticketPurchased;
  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)


  const handleIncrement = () => {
    if (ticketCount < Math.min(event.maxTicketsPerUser, availableTickets)) {
      setTicketCount(prev => prev + 1);
    }
    setTotalTicketPrice((prev) => prev += event.pricePerTicket)
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(prev => prev - 1);
    }
    setTotalTicketPrice((prev) => prev -= event.pricePerTicket)

  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };


  const validateContactInfo = (email: string, phone: string) => {
    const errors: Errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = 'Phone number must be 10 digits, start with 6, 7, 8, or 9, and contain no special characters.';
    }

    return errors;
  };



  const onSelectPaymentMethod = (paymentMethod: string) => {
    SetPaymentMethod(paymentMethod)
    if (paymentMethod == 'stripe') {
      handlePayment()
    } else if (paymentMethod == 'wallet') {
      handleWalletPayment()
    }
  }

  const handleWalletPayment = () => {
    const validationErrors = validateContactInfo(email, phone);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return; // ❌ Stop if there are validation errors
    }
    const ticketPaymentData: TicketEntity = {
      clientId: clientId!,
      email: email,
      phone: phone,
      eventId: event._id!,
      hasVariant: false
    }
    navigate('/ticketPaymentWallet', {
      state: {
        amount: event.pricePerTicket * ticketCount,
        ticketData: ticketPaymentData,
        type: 'ticketBooking',
        totalTicketCount: ticketCount,
        vendorId: event.hostedBy,

      }
    })
  }



  const handlePayment = () => {
    const validationErrors = validateContactInfo(email, phone);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return; // ❌ Stop if there are validation errors
    }
    const ticketPaymentData: TicketEntity = {
      clientId: clientId!,
      email: email,
      phone: phone,
      eventId: event._id!,
      hasVariant: Object.keys(selectedTickets).length > 0
    }
    if (totalTicketPrice <= 0) {
      toast.error('Select atleast one ticket')
      return
    }
  
    navigate('/ticketPayment', {
      state: {
        amount: totalTicketPrice,
        ticketData: ticketPaymentData,
        type: 'ticketBooking',
        totalTicketCount: ticketCount,
        vendorId: event.hostedBy,
        ticketPurchasedDetails: selectedTickets
      }
    })
    setOpen(false)
  }

  const handleTicketTypeIncreament = (ticketType: string, limit: number, available: number, price: number) => {
    setSelectedTickets((prev) => {
      const current = prev[ticketType] || 0;
      if (current < Math.min(limit, available)) {
        return { ...prev, [ticketType]: current + 1 };
      }
      return prev;
    });
    setTotalTicketPrice((prev) => prev += price)
  };

  const handleTicketTypeDecrement = (ticketType: string, price: number) => {
    setSelectedTickets((prev) => {
      const current = prev[ticketType] || 0;
      if (current > 0) {
        return { ...prev, [ticketType]: current - 1 };
      }
      return prev;
    });
    setTotalTicketPrice((prev) => prev -= price)

  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-[#0A0A0A] border-[#2A2F3C] z-50 backdrop-blur-2xl text-white h-[85vh] overflow-y-scroll custom-scrollbar">
        {showChoosePaymentModal && <PaymentMethodModal isOpen={showChoosePaymentModal} onClose={() => setShowChoosePaymentModal(false)} onSelectPaymentMethod={onSelectPaymentMethod} />}
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full">
          <Card className="w-full bg-[#0A0A0A] border-transparent text-white">
            <CardHeader className="space-y-1">
              <motion.div variants={itemVariants}>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-gray-400 line-clamp-3 mt-2">
                  {event.description}
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <CalendarIcon className="w-5 h-5 text-purple-400" />
                  <div className="flex flex-col">
                    {event?.schedule?.map((item, i) => (
                      <>
                        <span key={i} className=" text-sm text-neutral-300">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })} -
                          <span>     {`${item.startTime} to ${item.endTime} `}</span>
                        </span>
                      </>
                    ))}
                  </div>
                </div>



                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">{event.venueName}</div>
                    <div className="text-sm text-gray-400">{event.address}</div>
                  </div>
                </div>
              </motion.div>


              <Separator className="bg-[#2A2F3C]" />

              <motion.div variants={itemVariants} className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="bg-[#1A1F2C] border-[#2A2F3C] text-white placeholder:text-gray-500"
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="bg-[#1A1F2C] border-[#2A2F3C] text-white placeholder:text-gray-500"
                    />
                    {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

                  </div>
                </div>
                {event.multipleTicketTypeNeeded ? (<div>
                  {event.ticketTypeDescription?.map((ticket) => {
                    const currentCount = selectedTickets[ticket.ticketType] || 0;
                    const available = ticket.maxCount - (ticket.buyedCount || 0);
                    return (
                      <div key={ticket.ticketType} className="mb-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Ticket className="w-5 h-5 text-purple-400" />
                            <span className="font-medium">{ticket.ticketType}</span>
                          </div>
                          <span className="text-xl font-bold text-white">₹{ticket.price}</span>
                        </div>

                        <div className="flex justify-between items-center text-gray-300">
                          <span>Available Tickets</span>
                          <span>{available}</span>
                        </div>

                        <div className="flex justify-between items-center text-gray-300">
                          <span>Max Tickets Per User</span>
                          <span>{ticket.ticketLimitPerUser}</span>
                        </div>

                        <div className="p-4 bg-[#1A1F2C] rounded-lg border border-[#2A2F3C] mt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-white">Select Tickets</span>
                            <div className="flex items-center gap-4">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleTicketTypeDecrement(ticket.ticketType, ticket.price)}
                                disabled={currentCount <= 0}
                                className="bg-transparent border-[#2A2F3C] hover:bg-[#2A2F3C] text-white"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center text-white">{currentCount}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleTicketTypeIncreament(
                                    ticket.ticketType,
                                    ticket.ticketLimitPerUser,
                                    available,
                                    ticket.price
                                  )
                                }
                                disabled={currentCount >= Math.min(ticket.ticketLimitPerUser, available)}
                                className="bg-transparent border-[#2A2F2C] hover:bg-[#2A2F3C] text-white"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>) : (
                  <div>


                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Ticket className="w-5 h-5 text-purple-400" />
                        <span className="font-medium">Ticket Price</span>
                      </div>
                      <span className="text-xl font-bold text-white">₹{event.pricePerTicket}</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-300">
                      <span>Available Tickets</span>
                      <span>{availableTickets}</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-300">
                      <span>Max Tickets Per User</span>
                      <span>{event.maxTicketsPerUser}</span>
                    </div>

                    <div className="p-4 bg-[#1A1F2C] rounded-lg border border-[#2A2F3C]">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">Select Tickets</span>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleDecrement}
                            disabled={ticketCount <= 1}
                            className="bg-transparent border-[#2A2F3C] hover:bg-[#2A2F3C] text-white"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center text-white">{ticketCount}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleIncrement}
                            disabled={ticketCount >= Math.min(event.maxTicketsPerUser, availableTickets)}
                            className="bg-transparent border-[#2A2F3C] hover:bg-[#2A2F3C] text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </CardContent>

            <CardFooter className="flex-col space-y-4">
              <div className="w-full flex justify-between items-center">
                <span className="text-lg text-gray-300">Total Amount</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ₹{totalTicketPrice}
                </span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300"
                onClick={handlePayment}
                disabled={availableTickets === 0 || !email || !phone}
              >
                {availableTickets === 0 ? "Sold Out" : "Purchase Tickets"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchase;

