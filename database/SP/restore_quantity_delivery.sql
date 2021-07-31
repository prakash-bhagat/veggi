CREATE DEFINER=`admin`@`%` PROCEDURE `restore_quantity_delivery`(IN `oid` INT)
BEGIN
UPDATE mega_shop.products
       JOIN orders_details
       ON orders_details.product_id = products.id
SET    products.quantity = products.quantity + orders_details.quantity
WHERE orders_details.order_id = oid and orders_details.adminStatus = 1 and orders_details.deliveryStatus=0 ;
UPDATE mega_shop.orders_details SET order_delivery_time=now(),final_orderStatus=1 WHERE order_id = oid;
END