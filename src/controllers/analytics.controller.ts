import type { Request, Response } from "express";
import { Order } from "../models/order.model.ts";
import { Pet } from "../models/pet.model.ts";

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const totalAmount = await Order.aggregate([
      {
        $match: {
          paymentStatus: { $eq: "paid" },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);
    const adoptedPets = await Order.aggregate([
      {
        $match: {
          status: { $eq: "delivered" },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: { $size: "$orderItems" } },
        },
      },
      {
        $project: {
          totalAdoptedPets: "$count",
        },
      },
    ]);
    const availablePets = await Pet.aggregate([
      {
        $match: {
          isAvailable: { $eq: true },
          isAdopted: { $eq: false },
        },
      },
    ]).count("totalAvailablePets");
    res.status(200).json({
      totalAmount: totalAmount[0]?.total || 0,
      totalAdoptedPets: adoptedPets[0]?.totalAdoptedPets || 0,
      availablePets: availablePets[0]?.totalAvailablePets || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getOrdersTimeseries = async (req: Request, res: Response) => {
  try {
    const { period } = req.query;

    if (!period || !["week", "month", "year"].includes(period as string)) {
      return res.status(400).json({
        message: "Invalid period. Must be one of: week, month, year",
      });
    }

    const now = new Date();
    let startDate: Date;
    let groupByFormat: any;
    let dateRange: any[] = [];

    switch (period) {
      case "week":
        // Last 7 days
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        groupByFormat = {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        };

        // Generate all days in the week
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const dateStr = date.toISOString().split("T")[0];
          dateRange.push({
            date: dateStr,
            totalOrders: 0,
            totalAmount: 0,
            paidOrders: 0,
          });
        }
        break;

      case "month":
        // Current month - all days
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const daysInMonth = endDate.getDate();

        groupByFormat = {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        };

        // Generate all days in the month
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(now.getFullYear(), now.getMonth(), i);
          const dateStr = date.toISOString().split("T")[0];
          dateRange.push({
            date: dateStr,
            totalOrders: 0,
            totalAmount: 0,
            paidOrders: 0,
          });
        }
        break;

      case "year":
        // Current year - all months
        startDate = new Date(now.getFullYear(), 0, 1);

        groupByFormat = {
          $dateToString: { format: "%Y-%m", date: "$createdAt" },
        };

        // Generate all months in the year
        for (let i = 0; i < 12; i++) {
          const date = new Date(now.getFullYear(), i, 1);
          const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          dateRange.push({
            date: dateStr,
            totalOrders: 0,
            totalAmount: 0,
            paidOrders: 0,
          });
        }
        break;
    }

    // Aggregate orders data
    const ordersData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: groupByFormat,
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
          paidOrders: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "paid"] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Merge aggregated data with date range
    const dataMap = new Map(ordersData.map((item) => [item._id, item]));

    const timeseriesData = dateRange.map((entry) => {
      const data = dataMap.get(entry.date);
      return {
        date: entry.date,
        totalOrders: data?.totalOrders || 0,
        totalAmount: data?.totalAmount || 0,
        paidOrders: data?.paidOrders || 0,
      };
    });

    res.status(200).json({
      period,
      data: timeseriesData,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
