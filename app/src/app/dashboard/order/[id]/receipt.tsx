"use client"
import { Button } from "@/components/ui/button";
import { OrderItem } from "@prisma/client";
import { Document, Font, PDFDownloadLink, PDFViewer, Page, Text, View } from "@react-pdf/renderer";

import { StyleSheet } from '@react-pdf/renderer'
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";

Font.register({
  family: 'Custom',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inconsolata/v31/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8aRr8lleY2co.ttf',
    },
    {
      src: "https://fonts.gstatic.com/s/inconsolata/v31/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp2I7aRr8lleY2co.ttf",
      fontWeight: "bold"
    }
  ],
});

export const Receipt = ({ order }: { order: any }) => {
  // Calculate total item total and total tax
  const totalItemTotal = order.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const totalTax = order.items.reduce((acc: number, item: any) => acc + ((item.price * item.quantity) * (item.product.cgstTaxRate + item.product.sgstTaxRate)), 0);

  const Doc = () => (
    <Document title={`order_${order.id}`} style={{ fontFamily: "Custom" }}>
      <Page size="A4">
        <View style={{ padding: 20 }}>
          <View>
            <View style={{ textAlign: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Joven Motors</Text>
              <Text>VJ37+8V4, Road, Madurai Main, Kalayarkoil, Tamil Nadu 630551, India</Text>
            </View>

            <View style={{ textAlign: "center", marginVertical: 10 }}>
              <Text>{new Date(order.createdAt).toLocaleString()}</Text>
              <Text>Showroom Agent: {order.employee.name}</Text>
              <Text>
                Customer: {order.customer.name}
                {order.customer.phone && ` | ${order.customer.phone}`}
                {order.customer.email && ` | ${order.customer.email}`}
              </Text>
              <Text >Order Id: {order.id}</Text>
            </View>
          </View>
          <View>
            <Text style={{ textDecoration: 'underline', marginTop: 10 }}>Items</Text>
            <Table style={{ marginTop: 5 }}>
              <TableHeader>
                <TableCell>Quantity</TableCell>
                <TableCell>Item Code</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Item Total</TableCell>
                <TableCell>Tax</TableCell>
              </TableHeader>
              <TableBody>
                {order.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.product.code}</TableCell>
                      <TableCell>Rs.{item.price.toFixed(2)}</TableCell>
                      <TableCell>Rs.{(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell colSpan={2}>
                        (C {item.product.cgstTaxRate * 100}% S {item.product.sgstTaxRate * 100}%)
                        Rs.{((item.price * item.quantity) * (item.product.cgstTaxRate + item.product.sgstTaxRate)).toFixed(2)}
                      </TableCell>
                    </TableRow>
                ))}
                {/* Display Item Total and Total Tax */}
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell>Rs.{totalItemTotal.toFixed(2)}</TableCell>
                  <TableCell colSpan={2}>Rs.{totalTax.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </View>
          <View style={{ marginTop: 30, textAlign: "right" }}>
            <Text>Order Total: Rs.{order.invoice.amount.toFixed(2)}</Text>
            <View style={{marginVertical: 10}}>
              {
                order.invoice.payments.map((payment: any) => <Text key={payment.id}>({new Date(payment.createdAt).toLocaleString()}) {payment.method} Rs.{payment.amount.toFixed(2)}</Text>)
              }
            </View>
            <Text style={{ fontWeight: order.amountOwed > 0 ? "bold" : "normal" }}>Outstanding Balance: Rs.{order.amountOwed.toFixed(2)}</Text>
          </View>
        </View>

      </Page>
    </Document>
  )

  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="w-full flex items-center justify-center my-4">
        <PDFDownloadLink document={<Doc />} fileName={`order_${order.id}.pdf`}>
          {({ blob, url, loading, error }) =>
            <div className="">
              <Button disabled={loading}>
                Download Reciept {"->"}
              </Button>
            </div>
          }
        </PDFDownloadLink>
      </div>
      <PDFViewer className="w-full flex-grow" >
        <Doc />
      </PDFViewer>
    </div>
  )
};