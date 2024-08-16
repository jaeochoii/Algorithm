#include <iostream>
#include <string.h>
#include <algorithm>

using namespace std;

int main()
{
   // sync off
   ios::sync_with_stdio(false);
   cin.tie(0);
   cout.tie(0);
   // sync off

   int N;
   cin >> N;

   int currentArray[3], previousMaxArray[3], maxArray[3], previousMinArray[3], minArray[3];
   for (int i = 0; i < N; i++)
   {
      if (i > 0)
      {
         memcpy(previousMaxArray, maxArray, sizeof(previousMaxArray));
         memcpy(previousMinArray, minArray, sizeof(previousMinArray));
      }

      for (int j = 0; j < 3; j++)
      {
         cin >> currentArray[j];
      }

      if (i == 0)
      {
         maxArray[0] = minArray[0] = currentArray[0];
         maxArray[1] = minArray[1] = currentArray[1];
         maxArray[2] = minArray[2] = currentArray[2];
      }
      else
      {
         maxArray[0] = max(previousMaxArray[0] + currentArray[0], previousMaxArray[1] + currentArray[0]);
         maxArray[1] = max({previousMaxArray[0] + currentArray[1], previousMaxArray[1] + currentArray[1], previousMaxArray[2] + currentArray[1]});
         maxArray[2] = max(previousMaxArray[1] + currentArray[2], previousMaxArray[2] + currentArray[2]);
         
         minArray[0] = min(previousMinArray[0] + currentArray[0], previousMinArray[1] + currentArray[0]);
         minArray[1] = min({previousMinArray[0] + currentArray[1], previousMinArray[1] + currentArray[1], previousMinArray[2] + currentArray[1]});
         minArray[2] = min(previousMinArray[1] + currentArray[2], previousMinArray[2] + currentArray[2]);
      }
      
   }

   cout << max({maxArray[0], maxArray[1], maxArray[2]}) << " " << min({minArray[0], minArray[1], minArray[2]});

   return 0;
}